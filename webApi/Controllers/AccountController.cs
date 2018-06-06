using System.Collections.Generic;
using System.Linq;
using EntityFramework;
using Microsoft.AspNetCore.Mvc;
using DataModels;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Http;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Services;
using Microsoft.AspNetCore.Authorization;

namespace webApi.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        public AccountController(IMapper mapper, IUserService userService)
        {
            _mapper = mapper;
            _userService = userService;
        }

        [HttpPost("[action]")]
        public User Register([FromBody]LoginViewModel model)
        {
            RedirectToAction("Token", model);
            User user = _userService.CreateUser(model);
            return user;            
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "Admin")]
        public string Token()
        {
            return "asds";
        }


        [HttpPost("[action]")]
        public async Task Token([FromBody]LoginViewModel loginViewModel)
        {
            var username = loginViewModel.UserName;
            var password = loginViewModel.Password;
            ClaimsIdentity identity = new ClaimsIdentity();
            try
            {
                identity = GetIdentity(username, password);
            }
            catch 
            {
                var error = "Invalid username or password.";
                Response.StatusCode = 400;
                await Response.WriteAsync($"{{ error: '{error}' }}");
                return;
            }

            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name,
                role = identity.Claims.Where(x => x.Type == ClaimsIdentity.DefaultRoleClaimType).First().Value
            };

            // сериализация ответа
            Response.ContentType = "application/json";
            await Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
        }

        private ClaimsIdentity GetIdentity(string username, string password)
        {
            User user = _userService.FindByCredentials(username, password);
            if (1 != 3)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.UserName),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role.Name)
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }
        }
    }
}
