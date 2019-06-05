export default {
    methods: {
        resizeTextarea (event) {
            event.target.style.height = 'auto';
            event.target.style.height = (event.target.scrollHeight) + 'px';
        },
    },
    mounted () {
        this.$nextTick(() => {
            this.$el.setAttribute('style', 'height:' + (this.$el.scrollHeight) + 'px;overflow-y:hidden;max-height:229px;')
        })

        this.$el.addEventListener('input', this.resizeTextarea)
        this.$el.addEventListener('change', this.resizeTextarea)
    },
    beforeDestroy () {
        this.$el.removeEventListener('input', this.resizeTextarea)
        this.$el.removeEventListener('change', this.resizeTextarea)
    },
    render () {
        return this.$slots.default[0]
    },
}