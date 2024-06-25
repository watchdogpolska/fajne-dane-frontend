import {FrequencyPlotForm} from "./frequency-plot";
import {HtmlBodyForm} from "./html-body";
import {TitleBlockForm} from "./title-block";
import {AnswersMapForm} from "./answers-map";
import {AnswersTableForm} from "./answers-table";
import {ReferencesForm} from "./references";
import {FrequencyTableForm} from "./frequency-table";
import {
    BarChart as BarChartIcon,
    Title as TitleIcon,
    Notes as NotesIcon,
    Map as MapIcon,
    TableChart as TableChartIcon,
    Poll as PollIcon,
    MenuBook as MenuBookIcon,
} from '@mui/icons-material';


export const ComponentConfigs = {
    "frequency-plot": {
        typeName: "frequency-plot",
        name: "Wykres częstotliwości",
        description: "Wykres, który ma pokazać częstotliwość odpowiedzi w danym pytaniu.",
        component: FrequencyPlotForm,
        icon: BarChartIcon,
        defaultValues: {
            name: '',
            title: '',
            dataSourceId: '',
            dataSourceColumn: '',
            metadata: {
                "titleFontSize": 24,
            }
        },
        requiredFields: [
            'name', 'title', 'dataSourceId', 'dataSourceColumn'
        ],
        metadataFields: [
            { name: "titleFontSize", label: "Wielkość tytułu", type: "number"},
        ]
    },
    "title-block": {
        typeName: "title-block",
        name: "Blok tytułu",
        description: "Komponent służący do umieszczenia tytułu i podtytułu.",
        component: TitleBlockForm,
        icon: TitleIcon,
        defaultValues: {
            name: '',
            title: '',
            subtitle: '',
            metadata: {
                "titleFontSize": 36,
                "subtitleFontSize": 24,
            }
        },
        requiredFields: [
            'name', 'title'
        ],
        metadataFields: [
            { name: "titleFontSize", label: "Wielkość tytułu", type: "number"},
            { name: "subtitleFontSize", label: "Wielkość podtytułu", type: "number"},
        ]
    },
    "html-body": {
        typeName: "html-body",
        name: "Blok treści",
        description: "Zwykły edytor, który pozwala na umieszczenie prawie dowolnego tekstu.",
        component: HtmlBodyForm,
        icon: NotesIcon,
        defaultValues: {
            name: '',
            text: '',
            metadata: {}
        },
        requiredFields: [
            'name', 'text'
        ],
        metadataFields: []
    },
    "frequency-table": {
        typeName: "frequency-table",
        name: "Tabela częstotliwości",
        description: "Tabela zawierające częstotliwość odpowiedzi w danym pytaniu.",
        component: FrequencyTableForm,
        icon: TableChartIcon,
        defaultValues: {
            name: '',
            dataSourceId: '',
            dataSourceColumn: '',
            title: '',
            metadata: {
                "titleFontSize": 24,
            }
        },
        requiredFields: [
            'name', 'dataSourceId', 'dataSourceKey'
        ],
        metadataFields: [
            { name: "titleFontSize", label: "Wielkość tytułu", type: "number"},
        ]
    },
    "answers-table": {
        typeName: "answers-table",
        name: "Tabela odpowiedzi",
        description: "Tabela pokazująca jaki procent danego regionu przekazał odpowiedzi.",
        component: AnswersTableForm,
        icon: PollIcon,
        defaultValues: {
            name: '',
            dataSourceId: '',
            dataSourceKey: '',
            title: '',
            metadata: {
                "formatValue": "percentage",
                "titleFontSize": 24,
            }
        },
        requiredFields: [
            'name', 'dataSourceId', 'dataSourceKey'
        ],
        metadataFields: [
            { name: "titleFontSize", label: "Wielkość tytułu", type: "number"},
            { name: "formatValue", label: "Format wartości liczbowych", type: "hidden"},
        ]
    },
    "answers-map": {
        typeName: "answers-map",
        name: "Mapa odpowiedzi",
        description: "Mapa pokazująca jaki procent danego regionu przekazał odpowiedzi.",
        component: AnswersMapForm,
        icon: MapIcon,
        defaultValues: {
            name: '',
            dataSourceId: '',
            dataSourceKey: '',
            title: '',
            metadata: {
                "titleFontSize": 24,
            }
        },
        requiredFields: [
            'name', 'dataSourceId', 'dataSourceKey'
        ],
        metadataFields: [
            { name: "titleFontSize", label: "Wielkość tytułu", type: "number"},
        ]
    },
    "references": {
        typeName: "references",
        name: "Bibliografia",
        description: "Komponent wyświetla wszystkie źródła danych użyte w danym raporcie.",
        component: ReferencesForm,
        icon: MenuBookIcon,
        defaultValues: {
            name: '',
            metadata: {
                "titleFontSize": 24,
            }
        },
        requiredFields: [
            'name'
        ],
        metadataFields: [
            { name: "titleFontSize", label: "Wielkość tytułu", type: "number"},
        ]
    },
}
