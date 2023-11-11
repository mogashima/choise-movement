import Tag from "./Tag"

/**
 * ChoiseMovementのHTMLを構成するクラス
 */
export default class Element {
    private htmlElement: HTMLElement = document.createElement('div')
    private selectUlElement: HTMLElement = document.createElement('ul')
    private chosenUlElement: HTMLElement = document.createElement('ul')

    public constructor() {
        this.htmlElement.className = 'choise-movement'
        this.htmlElement.append(this.getHtml())
        this.dataRefresh()
    }

    /**
     * 初期のHTMLを構成するメソッド
     * @returns 
     */
    private getHtml(): HTMLElement {
        this.selectUlElement.className = 'cm-select-ul'
        const selectLabelElement = document.createElement('label')
        selectLabelElement.className = 'cm-select-p'
        selectLabelElement.innerText = 'Select'
        const selectElement = document.createElement('div')
        selectElement.className = 'cm-select'
        selectElement.append(selectLabelElement)
        selectElement.append(this.selectUlElement)

        this.chosenUlElement.className = 'cm-chosen-ul'
        const chosenLabelElement = document.createElement('label')
        chosenLabelElement.className = 'cm-chosen-p'
        chosenLabelElement.innerText = 'Chosen'
        const chosenElement = document.createElement('div')
        chosenElement.className = 'cm-chosen'
        chosenElement.append(chosenLabelElement)
        chosenElement.append(this.chosenUlElement)

        const html = document.createElement('div')
        html.className = 'cm-div'
        html.append(selectElement)
        html.append(chosenElement)
        return html
    }

    /**
     * 候補リストを削除するメソッド
     */
    private deleteSelectElement(): void {
        for (let li of this.selectUlElement.children) {
            li.remove()
        }
    }

    /**
     * 選択済リストを削除するメソッド
     */
    private deleteChosenElement(): void {
        for (let li of this.chosenUlElement.children) {
            li.remove()
        }
    }

    /**
     * 選択済を取得するメソッド
     * @returns 
     */
    public getChosen(): Tag[] {
        const tags: Tag[] = []
        for (let li of this.chosenUlElement.children) {
            tags.push(new Tag(li.id, li.innerHTML))
        }
        return tags
    }

    /**
     * 構成されたHTMLを返すメソッド
     * @returns 
     */
    public getElement(): HTMLElement {
        return this.htmlElement
    }

    public dataRefresh(): void {
        this.deleteSelectElement()
        this.deleteChosenElement()
    }

    /**
     * 候補を追加するメソッド
     * @param tag 
     */
    public addSelect(tag: Tag): void {
        const li = document.createElement('li')
        li.id = tag.id.toString()
        li.innerText = tag.label
        li.className = 'cm-select-li'

        let that = this
        li.addEventListener('click', function () {
            const sameId = that.htmlElement.getElementsByClassName('cm-chosen-li').namedItem(tag.id.toString())
            if (sameId === null) {
                that.addChosen(tag)
            }
        })
        this.selectUlElement.append(li)
    }

    /**
     * 選択済を追加するメソッド
     * @param tag 
     */
    public addChosen(tag: Tag): void {
        const li = document.createElement('li')
        li.id = tag.id.toString()
        li.innerText = tag.label
        li.className = 'cm-chosen-li'
        li.addEventListener('click', function () {
            this.remove()
        })
        this.chosenUlElement.append(li)
        //this.sortChosen()
    }

    /**
     * ソート用メソッド
     * 未使用
     */
    private sortChosen() {
        const container = document.querySelector('.cm-chosen-li')
        console.log(container)
        if (container !== null) {
            [].slice.call(container)
                .sort(function (a: HTMLElement, b: HTMLElement) { return Number(b.id) - Number(a.id); })
                .forEach(function (v) { container.appendChild(v); });
        }
    }

}