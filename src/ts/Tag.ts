/**
 * 候補用のクラス
 */
export default class Tag {
    public id: String
    public label: string
    public constructor(id: String, label: string) {
        this.id = id
        this.label = label
    }
}