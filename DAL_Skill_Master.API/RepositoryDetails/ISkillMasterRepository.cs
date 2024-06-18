using DAL_Skill_Master.API.Models.DomainModels;
using DAL_Skill_Master.API.Models.DTOModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Query;

namespace DAL_Skill_Master.API.RepositoryDetails
{
    public interface ISkillMasterRepository
    {
        Task<IEnumerable<Skill>> GetSkillMasterList(ODataQueryOptions<Skill> options);

        Task<ActionResult<Skill>> AddSkillMaster(Skill skillMasterModel);

        Task<ActionResult<SkillMasterDTO>> UpdateSkillMaster(int id, SkillMasterDTO skillMasterModel);

        Task<ActionResult<Skill>> DeleteDetails(int id);

        Task<ActionResult<Skill>> GetDetailsbyID(int id);
    }
}
