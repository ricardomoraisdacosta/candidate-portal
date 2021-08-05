using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.Data;
using backend.Dtos.Candidate;
using backend.models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.CandidateService
{


    public class CandidateService : ICandidateService
    {

        private readonly DataContext _context;

        private readonly IMapper _mapper;
        public CandidateService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;

        }
        public async Task<ServiceResponse<List<GetCandidateDto>>> AddCandidate(AddCandidateDto newCandidate)
        {
            var serviceResponse = new ServiceResponse<List<GetCandidateDto>>();
            Candidate candidate = _mapper.Map<Candidate>(newCandidate);
            _context.Candidates.Add(candidate);
            await _context.SaveChangesAsync();
            serviceResponse.Data = await _context.Candidates.Select(c => _mapper.Map<GetCandidateDto>(c)).ToListAsync();
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetCandidateDto>>> DeleteCandidate(int id)
        {

            var serviceResponse = new ServiceResponse<List<GetCandidateDto>>();

            try
            {
                Candidate candidate = await _context.Candidates.FirstAsync(c => c.Id == id);
                _context.Candidates.Remove(candidate);
                await _context.SaveChangesAsync();
                serviceResponse.Data = _context.Candidates.Select(c => _mapper.Map<GetCandidateDto>(c)).ToList();

            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetCandidateDto>>> GetAllCandidates()
        {
            var serviceResponse = new ServiceResponse<List<GetCandidateDto>>();
            var dbCandidates = await _context.Candidates.ToListAsync();
            serviceResponse.Data = dbCandidates.Select(c => _mapper.Map<GetCandidateDto>(c)).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetCandidateDto>> GetCandidateById(int id)
        {
            var serviceResponse = new ServiceResponse<GetCandidateDto>();
            var dbCharacter = await _context.Candidates.FirstOrDefaultAsync(c => c.Id == id);
            serviceResponse.Data = _mapper.Map<GetCandidateDto>(dbCharacter);
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetCandidateDto>> UpdateCandidate(UpdateCandidateDto updatedCandidadate)
        {

            var serviceResponse = new ServiceResponse<GetCandidateDto>();

            try
            {
                Candidate candidate = await _context.Candidates.FirstOrDefaultAsync(c => c.Id == updatedCandidadate.Id);
                candidate.Name = updatedCandidadate.Name;
                candidate.Email = updatedCandidadate.Email;
                candidate.address = updatedCandidadate.address;
                candidate.Phone = updatedCandidadate.Phone;
                await _context.SaveChangesAsync();

                serviceResponse.Data = _mapper.Map<GetCandidateDto>(candidate);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }


            return serviceResponse;
        }


    }
}