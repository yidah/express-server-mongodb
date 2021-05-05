exports.get404 = (req,res,next)=>{
    // sending response with status and sending a file
    // res.status(404).sendFile(path.join(__dirname,'views','404.html'));

    // sending data to the template
    res.status(404).render('404', {
        pageTitle:'Page Not Found',
        path: '/404'
    });
}