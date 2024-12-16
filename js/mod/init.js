// app.js

"use strict";

import { getElements } from "./getElements.js";
import { init } from "./eventHandlers.js";

document.addEventListener("DOMContentLoaded", function() {
  const elements = getElements();
  init(elements);
});

