import { observable, action, decorate } from "mobx";
import {TODAS} from "./../constants/categories.js"

class CategoryState {
    current = TODAS;
    setCurrent(current) {
        this.current = current;
    }
}

decorate(CategoryState, {
    current: observable,
    setCurrent: action
});

export default new CategoryState();

