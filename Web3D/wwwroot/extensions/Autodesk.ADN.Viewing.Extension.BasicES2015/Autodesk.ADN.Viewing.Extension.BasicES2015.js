(function webpackUniversalModuleDefinition(root,factory){if(typeof exports==="object"&&typeof module==="object")module.exports=factory();else if(typeof define==="function"&&define.amd)define([],factory);else if(typeof exports==="object")exports["Autodesk.ADN.Viewing.Extension.BasicES2015"]=factory();else root["Autodesk.ADN.Viewing.Extension.BasicES2015"]=factory()})(this,function(){return function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:false};modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);module.loaded=true;return module.exports}__webpack_require__.m=modules;__webpack_require__.c=installedModules;__webpack_require__.p="";return __webpack_require__(0)}([function(module,exports){eval('\'use strict\';\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n///////////////////////////////////////////////////////////////////////////////\n// Basic viewer extension written in ES2015\n// by Philippe Leefsma, July 2015\n//\n///////////////////////////////////////////////////////////////////////////////\n\nvar BasicES2015 = function (_Autodesk$Viewing$Ext) {\n  _inherits(BasicES2015, _Autodesk$Viewing$Ext);\n\n  /////////////////////////////////////////////////////////////////\n  // Class constructor\n  //\n  /////////////////////////////////////////////////////////////////\n  function BasicES2015(viewer, options) {\n    _classCallCheck(this, BasicES2015);\n\n    var _this = _possibleConstructorReturn(this, (BasicES2015.__proto__ || Object.getPrototypeOf(BasicES2015)).call(this, viewer, options));\n\n    console.log(BasicES2015.ExtensionId + \' Constructor\');\n\n    _this.viewer = viewer;\n    return _this;\n  }\n\n  /////////////////////////////////////////////////////////////////\n  // Extension Id\n  //\n  /////////////////////////////////////////////////////////////////\n\n\n  _createClass(BasicES2015, [{\n    key: \'load\',\n\n\n    /////////////////////////////////////////////////////////////////\n    // Load callback\n    //\n    /////////////////////////////////////////////////////////////////\n    value: function load() {\n\n      alert("BasicES2015 extension Loaded");\n\n      this.viewer.setBackgroundColor(255, 0, 0, 255, 255, 255);\n\n      return true;\n    }\n\n    /////////////////////////////////////////////////////////////////\n    // Unload callback\n    //\n    /////////////////////////////////////////////////////////////////\n\n  }, {\n    key: \'unload\',\n    value: function unload() {\n\n      this.viewer.setBackgroundColor(160, 176, 184, 190, 207, 216);\n\n      alert("BasicES2015 Unloaded");\n\n      return true;\n    }\n  }], [{\n    key: \'ExtensionId\',\n    get: function get() {\n\n      return \'Autodesk.ADN.Viewing.Extension.BasicES2015\';\n    }\n  }]);\n\n  return BasicES2015;\n}(Autodesk.Viewing.Extension);\n\nAutodesk.Viewing.theExtensionManager.registerExtension(\'Autodesk.ADN.Viewing.Extension.BasicES2015\', BasicES2015);//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXV0b2Rlc2suQUROLlZpZXdpbmcuRXh0ZW5zaW9uLkJhc2ljRVMyMDE1L0F1dG9kZXNrLkFETi5WaWV3aW5nLkV4dGVuc2lvbi5CYXNpY0VTMjAxNS5qcz85NmNlIl0sIm5hbWVzIjpbIkJhc2ljRVMyMDE1Iiwidmlld2VyIiwib3B0aW9ucyIsImNvbnNvbGUiLCJsb2ciLCJFeHRlbnNpb25JZCIsImFsZXJ0Iiwic2V0QmFja2dyb3VuZENvbG9yIiwiQXV0b2Rlc2siLCJWaWV3aW5nIiwiRXh0ZW5zaW9uIiwidGhlRXh0ZW5zaW9uTWFuYWdlciIsInJlZ2lzdGVyRXh0ZW5zaW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUFFTUEsVzs7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBWUMsTUFBWixFQUFvQkMsT0FBcEIsRUFBNkI7QUFBQTs7QUFBQSwwSEFFckJELE1BRnFCLEVBRWJDLE9BRmE7O0FBSTNCQyxZQUFRQyxHQUFSLENBQVlKLFlBQVlLLFdBQVosR0FBMEIsY0FBdEM7O0FBRUEsVUFBS0osTUFBTCxHQUFjQSxNQUFkO0FBTjJCO0FBTzVCOztBQUVEO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7MkJBQ087O0FBRUxLLFlBQU0sOEJBQU47O0FBRUEsV0FBS0wsTUFBTCxDQUFZTSxrQkFBWixDQUNFLEdBREYsRUFDTSxDQUROLEVBQ1EsQ0FEUixFQUVFLEdBRkYsRUFFTSxHQUZOLEVBRVcsR0FGWDs7QUFJQSxhQUFPLElBQVA7QUFDRDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7Ozs2QkFDUzs7QUFFUCxXQUFLTixNQUFMLENBQVlNLGtCQUFaLENBQ0UsR0FERixFQUNPLEdBRFAsRUFDWSxHQURaLEVBRUUsR0FGRixFQUVNLEdBRk4sRUFFVSxHQUZWOztBQUlBRCxZQUFNLHNCQUFOOztBQUVBLGFBQU8sSUFBUDtBQUNEOzs7d0JBakN3Qjs7QUFFdkIsYUFBTyw0Q0FBUDtBQUNEOzs7O0VBdEJ1QkUsU0FBU0MsT0FBVCxDQUFpQkMsUzs7QUF1RDNDRixTQUFTQyxPQUFULENBQWlCRSxtQkFBakIsQ0FBcUNDLGlCQUFyQyxDQUNFLDRDQURGLEVBRUVaLFdBRkYiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIEJhc2ljIHZpZXdlciBleHRlbnNpb24gd3JpdHRlbiBpbiBFUzIwMTVcbi8vIGJ5IFBoaWxpcHBlIExlZWZzbWEsIEp1bHkgMjAxNVxuLy9cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgQmFzaWNFUzIwMTUgZXh0ZW5kcyBBdXRvZGVzay5WaWV3aW5nLkV4dGVuc2lvbiB7XG5cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLy8gQ2xhc3MgY29uc3RydWN0b3JcbiAgLy9cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgY29uc3RydWN0b3Iodmlld2VyLCBvcHRpb25zKSB7XG5cbiAgICBzdXBlcih2aWV3ZXIsIG9wdGlvbnMpO1xuXG4gICAgY29uc29sZS5sb2coQmFzaWNFUzIwMTUuRXh0ZW5zaW9uSWQgKyAnIENvbnN0cnVjdG9yJyk7XG5cbiAgICB0aGlzLnZpZXdlciA9IHZpZXdlcjtcbiAgfVxuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIC8vIEV4dGVuc2lvbiBJZFxuICAvL1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICBzdGF0aWMgZ2V0IEV4dGVuc2lvbklkKCkge1xuXG4gICAgcmV0dXJuICdBdXRvZGVzay5BRE4uVmlld2luZy5FeHRlbnNpb24uQmFzaWNFUzIwMTUnO1xuICB9XG5cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLy8gTG9hZCBjYWxsYmFja1xuICAvL1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICBsb2FkKCkge1xuXG4gICAgYWxlcnQoXCJCYXNpY0VTMjAxNSBleHRlbnNpb24gTG9hZGVkXCIpO1xuXG4gICAgdGhpcy52aWV3ZXIuc2V0QmFja2dyb3VuZENvbG9yKFxuICAgICAgMjU1LDAsMCxcbiAgICAgIDI1NSwyNTUsIDI1NSk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIC8vIFVubG9hZCBjYWxsYmFja1xuICAvL1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICB1bmxvYWQoKSB7XG5cbiAgICB0aGlzLnZpZXdlci5zZXRCYWNrZ3JvdW5kQ29sb3IoXG4gICAgICAxNjAsIDE3NiwgMTg0LFxuICAgICAgMTkwLDIwNywyMTYpO1xuXG4gICAgYWxlcnQoXCJCYXNpY0VTMjAxNSBVbmxvYWRlZFwiKTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbkF1dG9kZXNrLlZpZXdpbmcudGhlRXh0ZW5zaW9uTWFuYWdlci5yZWdpc3RlckV4dGVuc2lvbihcbiAgJ0F1dG9kZXNrLkFETi5WaWV3aW5nLkV4dGVuc2lvbi5CYXNpY0VTMjAxNScsXG4gIEJhc2ljRVMyMDE1KTtcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXV0b2Rlc2suQUROLlZpZXdpbmcuRXh0ZW5zaW9uLkJhc2ljRVMyMDE1L0F1dG9kZXNrLkFETi5WaWV3aW5nLkV4dGVuc2lvbi5CYXNpY0VTMjAxNS5qcyJdLCJzb3VyY2VSb290IjoiIn0=')}])});