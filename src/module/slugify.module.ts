import slugify from 'slugify'

class SlugifyClass {
    public slug(slug: string) {
        const s = slugify(slug, {
            replacement: '-',
            remove: undefined,
            lower: true,
            strict: true,
            locale: "vi",
            trim: true
        })
        return s
    }
}

export default new SlugifyClass()