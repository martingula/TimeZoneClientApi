namespace TimeZonePoC.Api.Controllers {
    public class ProjectController : BaseController {
        private readonly ICacheService _cacheService;
        private readonly string _projectList = "project-list";

        public ProjectController(ICacheService cacheService) {
            _cacheService = cacheService;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ProjectDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<ProjectDto> Get(int id) {
            _cacheService.TryGetValue(_projectList, out List<ProjectDto>? projects); ;

            return (projects == null || projects.Count == 0) ? NotFound() : Ok(projects.Find(m => m.Id == id));
        }

        [HttpGet()]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<ProjectDto>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<ProjectDto> Get() {
            _cacheService.TryGetValue(_projectList, out List<ProjectDto>? projects);

            return projects == null ? NotFound() : Ok(projects);
        }

        [HttpPost]
        [ProducesResponseType(typeof(ProjectDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesDefaultResponseType]
        public IActionResult Post([FromBody] ProjectDto dto) {
            if(dto.Id == 0 || !ModelState.IsValid) {
                return BadRequest();
            }

            _cacheService.TryGetValue(_projectList, out List<ProjectDto>? projects);

            projects ??= new List<ProjectDto>();
            projects.Add(dto);

            _cacheService.Set(_projectList, projects, _cacheService.GetDefaultCacheEntryOptions());

            return Ok();
        }
    }
}
