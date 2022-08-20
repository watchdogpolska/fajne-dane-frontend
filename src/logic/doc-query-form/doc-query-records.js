
class Answer {
    constructor(value, probability) {
        this.value = value;
        this.probability = probability;
    }
}



export default class DocQueryRecords {
    constructor(docQuery) {
        this.docQuery = docQuery;
        this.answers = [];
        this.otherAnswers = [];
        this._prepareAnswers(docQuery);
    }
    
    get hasConflicts() {
        for (let answer of this.answers) {
            if (answer.probability !== null)
                return true;
        }
        if (this.otherProbability > 0)
            return true;
        return false;
    }
    
    get otherProbability() {
        let probability = 0;
        for (let answer of this.otherAnswers) {
            if (answer.probability !== null)
                probability += answer.probability;
        }
        return probability;
    }
    

    _prepareAnswers(docQuery) {
        let answersMap = {};
        for (let answer of docQuery.query.outputField.answers) {
            answersMap[answer] = this.answers.length;
            this.answers.push(new Answer(answer, null));
        }

        for (let record of docQuery.records) {
            if (record.source.type !== "FILE")
                continue;

            let answer = record.value;
            if (Object.keys(answersMap).indexOf(record.value) < 0) {
                // answer not found in predefined answers
                this.otherAnswers.push(new Answer(answer, record.probability));
            } else {
                let index = answersMap[answer];
                this.answers[index].probability = record.probability;
            }
        }
    }

    valueInAnswers(value) {
        for (let answer of this.answers) {
            if (answer.value == value)
                return true;
        }
        return false;
    }

    valueInOtherAnswers(value) {
        for (let answer of this.otherAnswers) {
            if (answer.value == value)
                return true;
        }
        return false;
    }
}
