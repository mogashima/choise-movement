import Element from "./Element";
import DataInterface from "./DataInterface";
import Tag from "./Tag";

/**
 * ChoiseMovementのクラス
 */
export default class ChoiseMovementElement extends HTMLElement {
    private element: Element
    constructor() {
        super();
        this.element = new Element()
    }

    connectedCallback() {
        this.append(this.element.getElement())
    }

    disconnectedCallback() {
        this.remove()
    }

    setOption() {

    }

    /**
     * 候補と選択済みの要素をセットするメソッド
     * @param data 
     */
    setData(data: DataInterface) {
        this.element.dataRefresh()

        const chosen: String[] = data.chosen

        data.select.forEach((tag: Tag) => {
            this.element.addSelect(tag)
            if (chosen.includes(tag.id)) {
                this.element.addChosen(tag)
            }
        })
    }

    /**
     * 選択済データを取得するメソッド
     * @returns 
     */
    getData(): Tag[] {
        const tags: Tag[] = this.element.getChosen()
        return tags
    }

}