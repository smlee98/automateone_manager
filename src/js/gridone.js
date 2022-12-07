import preloader from "./_preloader";
import * as bootstrap from "bootstrap";
import { checkItems, projectToggle, sidebarToggle } from "./_input";
import {
    accordionController,
    modalController,
    tooltipController,
} from "./_bsCustom";

/* Bootstrap */
window.bootstrap = bootstrap;

/* Preloader */
preloader();
modalController();
tooltipController();
accordionController();

/* InputItems */
checkItems();
projectToggle();
sidebarToggle();
