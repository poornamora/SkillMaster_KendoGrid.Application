using DAL_Skill_Master.API.DBDetails;
using DAL_Skill_Master.API.Models.DomainModels;
using DAL_Skill_Master.API.Models.DTOModels;
using DAL_Skill_Master.API.RepositoryDetails;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.Extensions.Options;

namespace DAL_Skill_Master.API.Controllers
{

    public class MasterDetailsController : ControllerBase
    {
        private readonly ApplicationAPIUser _applicationAPIUser;
        private readonly ISkillMasterRepository _skillRepository;
        public MasterDetailsController(ApplicationAPIUser applicationAPIUser, ISkillMasterRepository skillRepository)
        {
            _applicationAPIUser=applicationAPIUser;
            _skillRepository=skillRepository;
        }


        [HttpGet, Route("api/MasterForm/ListDetails")]
        public IActionResult GetAllDetails(ODataQueryOptions<Skill> options)
        {
            try
            {
                //var listdetails = _skillRepository.GetSkillMasterList(ODataQueryOptions<Skill> options);
                //return listdetails;


                var query = _applicationAPIUser.SkillMasterTbl.Where(x => x.IsDeleted==true);
                var result = options.ApplyTo(query);
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet, Route("api/MasterForm/Getexistingdetails/{id}")]
        public async Task<ActionResult<Skill>> GetUpdateDetails(int id)
        {
            try
            {
                var existingdetails = await _applicationAPIUser.SkillMasterTbl.FindAsync(id);
                if (existingdetails==null)
                {
                    return NotFound();
                }
                return existingdetails;
            }
            catch (Exception)
            {
                throw;
            }
        }



        [HttpPost, Route("api/MasterForm/SubmitDetails")]
        public async Task<ActionResult<Skill>> PostSkillFormDetails(Skill skillMasterModel)
        {
            try
            {
                bool skillExists = _applicationAPIUser.SkillMasterTbl.Any(m => m.SkillName.ToLower() == skillMasterModel.SkillName.ToLower());

                if (skillExists)
                {
                    // Return a conflict status code indicating that the skill already exists
                    return StatusCode(StatusCodes.Status409Conflict);
                }
                return await _skillRepository.AddSkillMaster(skillMasterModel);
                
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPut, Route("api/MasterForm/UpdateDetails/{id}")]
        public async Task<ActionResult<Skill>> PutSkillFormDetails(int id,SkillMasterDTO skillMasterModel)
        {
            try
            {
                if (id<=0) return NotFound();

                var updateddetails=await _skillRepository.UpdateSkillMaster(id, skillMasterModel);

                return Ok(updateddetails);
                
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet, Route("api/MasterForm/View")]
        public async Task<ActionResult<Skill>> GetDetailsbyId(int id)
        {
            try
            {
                if (id<=0) return NotFound();
                return await _skillRepository.GetDetailsbyID(id);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpDelete, Route("api/MasterForm/DeleteDetails/{id:int}")]
        public async Task<ActionResult<Skill>> DeleteSkillFormDetails(int id)
        {
            try
            {
                if (id<=0) NotFound();
                return await _skillRepository.DeleteDetails(id);
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
