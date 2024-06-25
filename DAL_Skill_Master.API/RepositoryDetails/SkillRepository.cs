using DAL_Skill_Master.API.DBDetails;
using DAL_Skill_Master.API.Models.DomainModels;
using DAL_Skill_Master.API.Models.DTOModels;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace DAL_Skill_Master.API.RepositoryDetails
{
    public class SkillRepository : ISkillMasterRepository
    {
        private readonly ApplicationAPIUser _context;
        public SkillRepository(ApplicationAPIUser context)
        {
            _context=context;
        }
        public async Task<ActionResult<Skill>> AddSkillMaster(Skill skillMasterModel)
        {
            try
            {
                
                Skill model = new Skill();
                model.SkillName= skillMasterModel.SkillName;
                model.NumberofEmployees= skillMasterModel.NumberofEmployees;
                model.RatePerHour=skillMasterModel.RatePerHour;
                model.RatePerHour= skillMasterModel.RatePerHour;
                model.Remark=skillMasterModel.Remark;
                model.IsActive=skillMasterModel.IsActive;
                _context.SkillMasterTbl.Add(model);
                await _context.SaveChangesAsync();
                return model;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<ActionResult<Skill>> DeleteDetails(int id)
        {
            try
            {
                var existingdetails = await _context.SkillMasterTbl.FirstOrDefaultAsync(i => i.SkillId==id);
                if (existingdetails!=null)
                {
                    existingdetails.IsDeleted=false;
                    await _context.SaveChangesAsync();

                    return existingdetails;
                }
                return existingdetails!;
            }
            catch(Exception)
            {
                throw;
            }
        }
     


        public async Task<ActionResult<Skill>> GetDetailsbyID(int id)
        {
            try
            {
                var existingdetails = await _context.SkillMasterTbl.FirstOrDefaultAsync(i => i.SkillId==id);
                if (existingdetails!=null)
                {
                    return existingdetails;
                }
                return existingdetails!;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Task<IEnumerable<Skill>> GetSkillMasterList(ODataQueryOptions<Skill> options)
        {
            try
            {
                var query = _context.SkillMasterTbl.Where(x => x.IsDeleted==true);
                var result = options.ApplyTo(query);
                return Task.FromResult((IEnumerable<Skill>)result);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<ActionResult<SkillMasterDTO>> UpdateSkillMaster(SkillMasterDTO skillMasterModel)
        {
            try
            {
                
                var existingdetails = await _context.SkillMasterTbl.FirstOrDefaultAsync(i => i.SkillId==skillMasterModel.SkillId);
                if (existingdetails!=null)
                {
                    existingdetails.SkillName=skillMasterModel.SkillName;
                    existingdetails.NumberofEmployees=skillMasterModel.NumberofEmployees;
                    existingdetails.Remark=skillMasterModel.Remark;
                    existingdetails.RatePerHour=skillMasterModel.RatePerHour;
                    existingdetails.IsActive=skillMasterModel.IsActive;
                    existingdetails.RatePerHour=skillMasterModel.RatePerHour;

                    await _context.SaveChangesAsync();
                    return skillMasterModel;
                }
                return null;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
