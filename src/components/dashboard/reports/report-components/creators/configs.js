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
        }
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
            subtitle: ''
        }
    },
    "html-body": {
        typeName: "html-body",
        name: "Blok treści",
        description: "Zwykły edytor, który pozwala na umieszczenie prawie dowolnego tekstu.",
        component: HtmlBodyForm,
        icon: NotesIcon,
        defaultValues: {
            name: '',
            text: ''
        }
    },
    "frequency-table": {
        typeName: "frequency-table",
        name: "Tabela częstotliwości",
        description: "Tabela zawierające częstotliwość odpowiedzi w danym pytaniu.",
        component: FrequencyTableForm,
        icon: TableChartIcon,
        defaultValues: {
        }
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
            title: ''
        }
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
            title: ''
        }
    },
    "references": {
        typeName: "references",
        name: "Bibliografia",
        description: "Komponent wyświetla wszystkie źródła danych użyte w danym raporcie.",
        component: ReferencesForm,
        icon: MenuBookIcon,
        defaultValues: {
            name: '',
        }
    },
}
