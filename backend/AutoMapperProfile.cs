using AutoMapper;
using backend.Dtos.Candidate;
using backend.models;

namespace backend
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Candidate, GetCandidateDto>();
            CreateMap<AddCandidateDto, Candidate>();
        }
    }
}