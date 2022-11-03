import {getRoot} from "./setup_helper";
import {useMemo, useState} from "react";

export const useGetFixed404Page = () => {
    const [data, setData] = useState({
        content: '',
        status: 'INITIAL'
    });

    useMemo(() => {
        const root_url = getRoot();
        const req = new XMLHttpRequest();
        req.addEventListener("load", (e) => {
            let page_data;
            page_data = e.target.responseText ?? "";
            const new_page_data = page_404_html.replace('let home = "";', `let home = "${root_url}";`);

            let status = "SUCCESS";
            if (new_page_data === page_data){
                status = "UNCHANGED";
            }
            setData({
                content: new_page_data,
                status: status
            });
        });
        req.addEventListener("error", _ => {
            setData({
                content: '',
                status: 'ERROR'
            });
        });
        req.open("GET", root_url + "/404.html");
        req.send();
    }, []);

    return data;
}

export const useGetFixedIndexPage = () => {
    const [data, setData] = useState({
        content: '',
        status: 'INITIAL'
    });
    useMemo(() => {
        const root_url = getRoot();
        const req = new XMLHttpRequest();
        req.addEventListener("load", (e) => {
            let page_data;
            page_data = e.target.responseText ?? "";
            let to_add = page_data.match(/<script defer.+<\/head>/g);
            to_add = to_add? to_add[0] : "</head>";
            to_add = to_add.replace(/type=["']{1}.+-text\/javascript["']{1}/g, 'type="text/javascript"');

            let new_page_data = page_index_html.replace("</head>", to_add);
            new_page_data = new_page_data.replace('"/static/', `"${root_url}/static/`);

            let status = "SUCCESS";
            if (new_page_data === page_data){
                status = "UNCHANGED";
            }
            setData({
                content: new_page_data,
                status: status
            });
        });
        req.addEventListener("error", _ => {
            setData({
                content: '',
                status: 'ERROR'
            });
        });
        req.open("GET", root_url + "/index.html");
        req.send();
    }, []);

    return data;
}

const page_index_html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <title></title>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#000000" />

    <script type="text/javascript">
      (function(loc) {
        if (loc.search[1] === '/' ) {
          let decoded = loc.search.slice(1).split('&').map(function(s) {
            return s.replace(/~and~/g, '&')
          }).join('?');
          window.history.replaceState(null, null, loc.pathname.slice(0, -1) + decoded + loc.hash);
        }
      }(window.location))
    </script>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
`;

const page_404_html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title></title>
    <script type="text/javascript">
        let home = "";
        const pathSegmentsToKeep = (home === "") ? 0 : home.replace(/\\/+$/, '').split("//")[1]?.split("/").slice(1) ?? [];

        let loc = window.location;
        loc.replace(
            loc.protocol + '//' + loc.hostname + (loc.port ? ':' + loc.port : '') +
            loc.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
            loc.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
            (loc.search ? '&' + loc.search.slice(1).replace(/&/g, '~and~') : '') +
            loc.hash
        );

    </script>
</head>
<body>
</body>
</html>
`;
