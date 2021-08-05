using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Dtos.Candidate;
using backend.models;

namespace backend.Services.CandidateService
{
    public interface ICandidateService
    {
        //Task is for Async
        Task<ServiceResponse<List<GetCandidateDto>>> GetAllCandidates();
        Task<ServiceResponse<GetCandidateDto>> GetCandidateById(int id);
        Task<ServiceResponse<List<GetCandidateDto>>> AddCandidate(AddCandidateDto newCandidate);
        Task<ServiceResponse<GetCandidateDto>> UpdateCandidate(UpdateCandidateDto updatedCandidadate);
        Task<ServiceResponse<List<GetCandidateDto>>> DeleteCandidate(int id);
    }
}