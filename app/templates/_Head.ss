<head>
    <% base_tag %>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title><% if $MetaTitle %>$MetaTitle<% else %>$Title<% end_if %> | $SiteConfig.Title</title>
    <% if $MetaDescription %>$MetaTags(false)<% else %><meta name="description" content="{$SiteConfig.Title}: {$Title}"><% end_if %>

    <link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16" />

    <link href="$ThemeDir/styles/main.css" rel="stylesheet">

    <script src="$ThemeDir/scripts/jquery.min.js"></script>
    <script src="$ThemeDir/scripts/main.min.js" async></script>

    <% include GoogleAnalytics %>
</head>
