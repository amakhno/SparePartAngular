using AutoMapper;
using DataModels.ViewModels;
using System.Linq.Expressions;

namespace DataModels
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Add as many of these lines as you need to map your objects
            CreateMap<Model, ModelUserViewModel>();
            CreateMap<Mark, MarkAdminEditViewModel>();
            CreateMap<MarkAdminEditViewModel, Mark>();
            CreateMap<SparePart, SparePartAdminEditViewModel> ()
                .Ignore(x=>x.ImageBase64)
                .Ignore(x=>x.ImageName);
            CreateMap<SparePartAdminEditViewModel, SparePart>();
            CreateMap<MarksForSelectViewModel, Mark>();
            CreateMap<SparePart, SparePartForUsers>()
                .ForMember(dest => dest.MarkName, 
                    config => config.MapFrom(src => src.Mark.Name));
        }
    }

    public static class IgnoreClass
    {
        public static IMappingExpression<TSource, TDestination> Ignore<TSource, TDestination>(
    this IMappingExpression<TSource, TDestination> map,
    Expression<System.Func<TDestination, object>> selector)
        {
            map.ForMember(selector, config => config.Ignore());
            return map;
        }
    }
}