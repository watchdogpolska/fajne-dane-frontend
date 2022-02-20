
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
        return false;
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

            if (Object.keys(answersMap).indexOf(record.value) < 0) {
                answersMap[answer] = answers.length;
                this.otherAnswers.push(new Answer(answer, record.probability));
            } else {
                let index = answersMap[answer];
                this.answers[index].probability = record.probability;
            }
        }
    }
}
