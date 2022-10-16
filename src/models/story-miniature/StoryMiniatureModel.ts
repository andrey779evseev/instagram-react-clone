export default class StoryMiniatureModel {
	constructor(obj?: Partial<StoryMiniatureModel>) {
		if (obj) Object.assign(this, obj)
	}
	Cover: string
	Name: string
}
