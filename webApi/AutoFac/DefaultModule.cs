using Autofac;
using Repositories;
using Services;

namespace webApi
{
    public class DefaultModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<EntityUserRepository>().As<IUserRepository>();
            builder.RegisterType<UserService>().As<IUserService>();
            builder.RegisterType<EntityMarkRepository>().As<IMarkRepository>();
            builder.RegisterType<MarkService>().As<IMarkService>();
            builder.RegisterType<EntityImageRepository>().As<IImageRepository>();
            builder.RegisterType<ImageService>().As<IImageService>();
            builder.RegisterType<EntitySparePartRepository>().As<ISparePartRepository>();
            builder.RegisterType<SparePartService>().As<ISparePartService>();
        }
    }
}