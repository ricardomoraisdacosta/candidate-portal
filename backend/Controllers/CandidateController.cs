using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Candidate;
using backend.models;
using backend.Services.CandidateService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class CandidateController : ControllerBase
    {

        private readonly ICandidateService _candidateService;

        public CandidateController(ICandidateService candidateService)
        {
            _candidateService = candidateService;

        }


        [HttpGet("GetAll")]
        public async Task<ActionResult<ServiceResponse<List<GetCandidateDto>>>> Get()
        {
            return Ok(await _candidateService.GetAllCandidates());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<GetCandidateDto>>> GetSingle(int id)
        {
            return Ok(await _candidateService.GetCandidateById(id));
        }

        [HttpPost]

        public async Task<ActionResult<ServiceResponse<List<GetCandidateDto>>>> AddCandidate(AddCandidateDto newCandidate)
        {

            return Ok(await _candidateService.AddCandidate(newCandidate));
        }
        [HttpPut]

        public async Task<ActionResult<ServiceResponse<List<GetCandidateDto>>>> UpdateCandidate(UpdateCandidateDto updatedCandidate)
        {
            var response = await _candidateService.UpdateCandidate(updatedCandidate);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<List<GetCandidateDto>>>> Delete(int id)
        {
            var response = await _candidateService.DeleteCandidate(id);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }

    }
}