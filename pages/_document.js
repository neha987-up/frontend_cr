import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
        <meta name="theme-color" content="#000000" />
        <link rel="icon" sizes="32x32" href="/favicon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />
        {/* <title>Collection Reward</title> */}
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBbytCk92gm3MK3Mrs_374RDKf4bz0X1ck&libraries=places"
          async defer></script>
        <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.1.1/js/fontawesome.min.js" integrity="sha512-UtDq4PkcIa4+JFzeH6jzQbqbGoeUw+L0tX62xiixM0cajUZArxeG1AyPyTbcTRet8BzDyLaLhoKqWCpv+auMvg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/5.4.7/antd.min.js" integrity="sha512-pTO+IXhxR1Jc0ETkfub+nYHRtueeD+xNCKNiXJHDzZ0cSLYRsqDzRRUBOnD2dmyaXa1vx4m55S6+17mr/ROLqA==" crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-8VM9959WHL`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8VM9959WHL', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
      </body>
    </Html>
  )
}
