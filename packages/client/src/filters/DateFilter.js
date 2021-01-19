const formatter = new Intl.DateTimeFormat([], {
    timeStyle: 'medium'
});

export function DateFilter(Vue) {
    Vue.filter('date', (value) => {
        if (value instanceof Date) {
            return formatter.format(value);
        }
        return value;
    });
}