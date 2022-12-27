import * as bootstrap from "bootstrap";
import preloader from "./_preloader";
import { checkItems, projectToggle, sidebarToggle } from "./_input";
import {
    accordionController,
    modalController,
    tooltipController,
} from "./_bsCustom";
import { excelController } from "./_excel";
import { getCookie, setCookie } from "./_cookie";
import { themeController } from "./_theme";

/* Bootstrap */
window.bootstrap = bootstrap;

/* Cookie */
getCookie();
setCookie();

/* Theme */
themeController();

/* Preloader */
preloader();
modalController();
tooltipController();
accordionController();

/* InputItems */
checkItems();
projectToggle();
sidebarToggle();

/* Excel Export */
excelController();
