import Tag from "./Tag"

/**
 * データをセットする際のインタフェース
 */
export default interface DataInterface {
    // 候補
    select: Tag[]

    // 選択済要素
    chosen: String[]

}