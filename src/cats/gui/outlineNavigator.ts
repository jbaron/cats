/**      
 * Create a simple Tree to mimic outline functionality      
 */
class OutlineNavigator extends qx.ui.tree.Tree {

    constructor() {
        super();

        this.setDecorator(null);
        this.setPadding(0, 0, 0, 0);
        this.setHideRoot(true);

        // create and set the tree root
        var root = new qx.ui.tree.TreeFolder("Desktop");
        this.setRoot(root);

        for (var f = 0; f < 10; f++) {
            var f1 = new qx.ui.tree.TreeFolder("Class-" + f);
            root.add(f1);
            // create a third layer
            for (var i = 0; i < 10; i++) {
                var f11 = new qx.ui.tree.TreeFile("Method-" + i);
                f1.add(f11);
            }
        }
        // open the folders
        root.setOpen(true);
        f1.setOpen(true);
    }

}