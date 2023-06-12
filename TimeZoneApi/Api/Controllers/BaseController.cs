namespace TimeZoneApi.Api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public abstract class BaseController : ControllerBase {
        protected BaseController() {
        }
    }
}
