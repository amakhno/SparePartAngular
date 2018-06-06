using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using DataModels;
using EntityFramework;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    public class ImagesController : Controller
    {
        [HttpPost]
        [Route("uploadFile")]
        public IActionResult UploadImage(int Id)
        {
            int resultId = 0;
            IFormFile uploadedImage = Request.Form.Files.FirstOrDefault();
            if (uploadedImage == null || uploadedImage.ContentType.ToLower().StartsWith("image/"))
            {
                using (EntityFrameworkContext dbContext = new EntityFrameworkContext())
                {
                    MemoryStream ms = new MemoryStream();
                    uploadedImage.OpenReadStream().CopyTo(ms);

                    //System.Drawing.Image image = System.Drawing.Image.FromStream(ms);

                    Image imageEntity = new Image()
                    {
                        Name = uploadedImage.Name,
                        Data = ms.ToArray(),
                        ContentType = uploadedImage.ContentType
                    };

                    resultId = dbContext.Images.Add(imageEntity).Entity.Id;
                    dbContext.SaveChanges();
                }
            }
            return Ok(resultId);
        }

        [HttpGet]
        [Route("{id}")]
        public FileStreamResult ViewImage(int id)
        {
            using (EntityFrameworkContext dbContext = new EntityFrameworkContext())
            {
                Image image = dbContext.Images.FirstOrDefault(m => m.Id == id);

                MemoryStream ms = new MemoryStream(image.Data);

                return new FileStreamResult(ms, image.ContentType);
            }
        }

        [HttpPost]
        [Route("[action]")]
        public IActionResult PostImage([FromBody]InputTest image)
        {
            image.base64String = image.base64String.Substring(image.base64String.IndexOf("base64,") + 7);
            /*string converted = image.base64String.Replace('-', '+');
            converted = converted.Replace('_', '/');*/
            var bytes = Convert.FromBase64String(image.base64String);
            using (var imageFile = new FileStream("asdasd", FileMode.Create))
            {
                imageFile.Write(bytes, 0, bytes.Length);
                imageFile.Flush();
            }
            return Ok();
        }


    }

    public class InputTest
    {
        public string base64String;
    }
}
