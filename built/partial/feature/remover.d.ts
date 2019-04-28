import Getter from './getter';
import SaveLoad from './save-load';
import Switcher from './switcher';
declare class Remover {
    private readonly getter;
    private readonly saveLoad;
    private readonly switcher;
    private readonly context;
    constructor(getter: Getter, saveLoad: SaveLoad, switcher: Switcher, context: JQueryTab.Context);
    remove(positions: JQueryTab.TabItemPosition[]): number | undefined;
}
export default Remover;
