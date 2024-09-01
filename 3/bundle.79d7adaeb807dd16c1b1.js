(()=>{"use strict";const e="beforeend";class t{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n    <div class="trip-filters__filter">\n      <input\n        id="filter-everything"\n        class="trip-filters__filter-input visually-hidden"\n        type="radio"\n        name="trip-filter"\n        value="everything"\n        checked\n      />\n      <label class="trip-filters__filter-label" for="filter-everything">\n        Everything\n      </label>\n    </div>\n\n    <div class="trip-filters__filter">\n      <input\n        id="filter-future"\n        class="trip-filters__filter-input visually-hidden"\n        type="radio"\n        name="trip-filter"\n        value="future"\n      />\n      <label class="trip-filters__filter-label" for="filter-future">\n        Future\n      </label>\n    </div>\n\n    <div class="trip-filters__filter">\n      <input\n        id="filter-present"\n        class="trip-filters__filter-input visually-hidden"\n        type="radio"\n        name="trip-filter"\n        value="present"\n      />\n      <label class="trip-filters__filter-label" for="filter-present">\n        Present\n      </label>\n    </div>\n\n    <div class="trip-filters__filter">\n      <input\n        id="filter-past"\n        class="trip-filters__filter-input visually-hidden"\n        type="radio"\n        name="trip-filter"\n        value="past"\n      />\n      <label class="trip-filters__filter-label" for="filter-past">\n        Past\n      </label>\n    </div>\n\n    <button class="visually-hidden" type="submit">\n      Accept filter\n    </button>\n  </form>'}getElement(){return this.element||(this.element=function(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}(this.getTemplate())),this.element}removeElement(){this.element=null}}const n=document.querySelector(".trip-main").querySelector(".trip-controls__filters");new class{filtersComponent=new t;constructor({filtersContainer:e}){this.filtersContainer=e}init(){!function(t,n,i=e){n.insertAdjacentElement(i,t.getElement())}(this.filtersComponent,this.filtersContainer,e)}}({filtersContainer:n}).init()})();
//# sourceMappingURL=bundle.79d7adaeb807dd16c1b1.js.map