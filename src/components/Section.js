export class Section {
    constructor({ renderer}, elements){
        this.renderer = renderer;
        this.elements = elements;
    }

    renderItems(items, name, id){
        items.forEach(item =>{
            this.renderer(item, this.elements, name, id);
        })
    }
    addItem(item, containItem){
        containItem.prepend(item);
    }
    deleteItem(item){
        item.remove();
    }
}