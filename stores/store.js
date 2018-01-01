import { extendObservable, action } from 'mobx'

class Store {
    constructor() {
        extendObservable(this, {
            item: 'My Work',
            itemsDS: null,
            
            tick: action(function() {
                console.log('tick')
            })
        })
    }
}
export default Store;