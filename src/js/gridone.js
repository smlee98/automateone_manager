import * as bootstrap from "bootstrap";
import preloader from "./_preloader";
import {
    checkItems,
    datepickerController,
    projectToggle,
    sidebarToggle,
    timepickerController,
} from "./_input";
import {
    accordionController,
    modalController,
    tooltipController,
} from "./_bsCustom";
import { excelController } from "./_excel";
import { themeController } from "./_theme";
import dynamicTableInit from "./_dynamicTable";

/* Bootstrap */
window.bootstrap = bootstrap;
modalController();
tooltipController();
accordionController();

/* DatePicker */
timepickerController();
datepickerController();

/* Theme */
themeController();

/* Preloader */
preloader();

/* InputItems */
checkItems();
projectToggle();
sidebarToggle();

/* Excel Export */
excelController();

/* DynamicTable */
dynamicTableInit();
