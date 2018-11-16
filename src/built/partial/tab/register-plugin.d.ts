import $ from 'jquery';
declare function registerPlugin(pluginName: keyof typeof $.fn): void;
export default registerPlugin;
