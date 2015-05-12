- The images folder is the same as the original one so you can delete it if you already have the original one.

- The RTL CSS & JS files don't override the original files so you have to remove the original files from the <head> and include only the RTL ones.

- Sample Markup:

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>jQuery Mobile 1.3.0 RTL</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="rtl.jquery.mobile-1.3.0.min.css" />
    <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
    <script src="rtl.jquery.mobile-1.3.0.min.js"></script>
</head>
<body>
    <div data-role="page">

        <div data-role="header">
            <h1>ج-كويري</h1>
            <a href="/" data-icon="back" data-rel="back" data-iconpos="notext">رجوع</a>
            <a href="/" data-icon="home" data-iconpos="notext">الرئيسية</a>
        </div>

        <div data-role="content">
            <h1>مرحبا ج-كويري موبايل 1.3.0</h1>
        </div>

    </div>
</body>
</html>