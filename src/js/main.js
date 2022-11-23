import preloader from "./_preloader";
import * as bootstrap from "bootstrap";
import { checkItems, projectToggle, sidebarToggle } from "./_input";

/* Bootstrap */
window.bootstrap = bootstrap;

/* Preloader */
preloader();

/* InputItems */
checkItems();
projectToggle();
sidebarToggle();
