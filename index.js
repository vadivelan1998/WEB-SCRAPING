const puppeteer=require("puppeteer");
const express=require("express")
const app=express()


     getData = async () => {
       const browser = await puppeteer.launch({ headless: false });
       const page = await browser.newPage();
       await page.goto(
         "https://www.google.com/search?q=react+jobs&ei=4duYYpLRJYq94-EPqfK90AE&uact=5&oq=react+jobs&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMggIABCABBDJAzIFCAAQkgMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgQIABBHOgUIABCRAjoUCC4QgAQQsQMQgwEQxwEQ0QMQ1AI6CAguEIAEELEDOgUILhCABDoLCAAQgAQQsQMQgwE6BAgAEEM6DgguEIAEELEDEMcBEKMCOgsILhDHARCvARCRAjoHCAAQyQMQQzoOCC4QgAQQsQMQxwEQ0QM6CAgAEIAEELEDOggILhCABBDUAjoLCC4QgAQQsQMQ1AI6DQgAELEDEIMBEMkDEEM6CAgAELEDEIMBOgoIABCxAxCDARANOgQIABANOgcIABDJAxANSgQIQRgASgQIRhgAUJseWIgzYOczaANwAngAgAGmAYgB5AqSAQQwLjExmAEAoAEBsAEAyAEIwAEB&sclient=gws-wiz&ibp=htl;jobs&sa=X&ved=2ahUKEwi546uOj4_4AhXh6zgGHQlPDQYQutcGKAF6BAgHEAY#htivrt=jobs&htidocid=DNXJc0LPw_4AAAAAAAAAAA%3D%3D&fpstate=tldetail"
       );

       // await page.screenshot({path:"myimg.png"});
       const grabDetalis = await page.evaluate(() => {
         var arr = [];
         const data = document.querySelectorAll(
           ".iFjolb.gws-plugins-horizon-jobs__li-ed"
         );
         data.forEach((d) => {
           let title = d.querySelector(".BjJfJf.PUpOsf").innerHTML;
           let company = d.querySelector(".vNEEBe").innerHTML;
           let description = d.querySelector(".HBvzbc").textContent;
           let location = d.querySelector(".Qk80Jf").innerHTML;
           arr.push({ title, company, location, description });
         });
         return arr;
       });
       console.log(grabDetalis);
       await browser.close();
         app.get("/",(req,res)=>{
             try {
                  return res.status(200).send(grabDetalis);
             } catch (error) {
                 console.log(error)
             }
            
         })
     };

app.listen(5000, async () => {
  try {
    console.log(`listening port 5000`);
  } catch (error) {
    console.log(error.message);
  }
});
getData()