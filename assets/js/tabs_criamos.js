const querySelectorAllEventListener = (query, event, callback) => {
    document.querySelectorAll(query).forEach(el => {
        el.addEventListener(event, (ev) => {
            callback(el, ev)
        });
    })
}

window.addEventListener('load', () => {
    let currentTab = 0;

    const setCurrentTab = (tab) => {
        currentTab = tab;
        document.querySelectorAll('[data-tab-parent]').forEach(el => {
            el.classList.add('hidden');
        });
        document.querySelectorAll(`[data-tab-parent="${currentTab}"]`).forEach(el => {
            el.classList.remove('hidden');
        });

        const tabClasses = [
            ['text-arms-black', 'bg-arms-white'],
            ['text-arms-white', 'bg-arms-black-600'],
            ['text-arms-white', 'bg-arms-black-700'],
            ['text-arms-white', 'bg-arms-black'],
        ];
        const getTabClasses = (val) => {
            val = (val < 0) ? tabClasses.length + val : val;
            return tabClasses[val];
        }

        document.querySelectorAll('[data-tab-toggle]').forEach((el, elIndex) => {
            tabClasses.forEach(classes => {
                classes.forEach(_class => el.classList.remove(_class));
            });

            const classes = getTabClasses(elIndex - currentTab);
            classes.forEach(_class => el.classList.add(_class));

            el.querySelector('svg').classList.remove('rotate-90');
            if(elIndex == currentTab) el.querySelector('svg').classList.add('rotate-90');
        })
    }

    querySelectorAllEventListener('[data-tab-toggle]', 'click', (el, ev) => {
        const tab = parseInt(el.getAttribute('data-tab-toggle'));
        setCurrentTab(tab);
    });
});