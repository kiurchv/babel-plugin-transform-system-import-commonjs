import template from "babel-template";

let buildPromise = template(`
  new Promise(function(resolve) {
    resolve(require($0));
  }.bind(this));
`);

let deprecationReported = false;

export default function () {
  if (!deprecationReported) {
    console.warn(
`babel-plugin-transform-system-import-commonjs: Using System.import is deprecated.
Since import() proposal was accepted, System.import function now is obsolete and this plugin is not recommended to use in new projects.
Please use import() function with https://www.npmjs.com/package/babel-plugin-transform-import-commonjs instead.`
    );

    deprecationReported = true;
  }

  return {
    visitor: {
      CallExpression: function (path) {
        let callee = path.get("callee");
        let args   = path.get("arguments");

        if (!callee.matchesPattern("System.import") ||
            !args.length) return;

        path.scope.rename("require");
        path.replaceWith(buildPromise(args[0].node));
      }
    }
  };
}
