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

        const tabClasses = {
            active: ['text-arms-black', 'bg-arms-white'],
            inactive: ['text-arms-white', 'bg-arms-black', 'hover:bg-arms-black-600']
        }

        const getTabClasses = (val) => {
            return val == tab ? tabClasses.active : tabClasses.inactive
        }

        document.querySelectorAll('[data-tab-toggle]').forEach((el, elIndex) => {
            ['hover:bg-arms-black-600', 'text-arms-black', 'text-arms-white', 'bg-arms-white', 'bg-arms-black'].forEach(_class => {
                el.classList.remove(_class);
            });

            const classes = getTabClasses(elIndex);
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