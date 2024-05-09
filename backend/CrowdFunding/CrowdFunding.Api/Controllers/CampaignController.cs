using MediatR;
using Microsoft.AspNetCore.Mvc;
using CrowdFunding.Application.Queries.Campaign;
using CrowdFunding.Application.Commands.Campaign;

namespace CrowdFunding.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CampaignController : ControllerBase
    {
        private readonly ILogger<CampaignController> _logger;
        private readonly IMediator _mediator;

        public CampaignController(ILogger<CampaignController> logger, IMediator mediator)
        {
            _logger = logger;
            _mediator = mediator;
        }

        // GET api/campaign
        [HttpGet]
        public async Task<ActionResult<GetAllCampaignsResponse>> GetAll(CancellationToken cancellationToken)
        {
            var request = new GetAllCampaignsRequest();
            var response = await _mediator.Send(request, cancellationToken);
            return Ok(response);
        }

        // POST api/campaign
        [HttpPost]
        public async Task<ActionResult<AddCampaignResponse>> Create([FromBody] AddCampaignRequest request, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(request, cancellationToken);
            return Ok(response);
        }

        // PUT api/campaign/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateCampaignRequest request, CancellationToken cancellationToken)
        {
            var updateRequest = new UpdateCampaignRequest(id, request.ImageUrl, request.Description, request.TransactionHash);
            var response = await _mediator.Send(updateRequest, cancellationToken);
            return Ok(response);
        }


        // DELETE api/campaign/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
        {
            var request = new DeleteCampaignRequest(id);
            var response = await _mediator.Send(request, cancellationToken);
            return Ok(response);
        }

        // GET api/campaign/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<GetCampaignByIdResponse>> Get(Guid id, CancellationToken cancellationToken)
        {
            var request = new GetCampaignByIdRequest(id);
            var response = await _mediator.Send(request, cancellationToken);
            return Ok(response);
        }

        // GET api/campaign/owner/{ownerAddress}/locked
        [HttpGet("owner/{ownerAddress}/locked")]
        public async Task<ActionResult<GetLockedCampaignRequest>> Get(string ownerAddress, CancellationToken cancellationToken)
        {
            var request = new GetLockedCampaignRequest(ownerAddress);
            var response = await _mediator.Send(request, cancellationToken);
            return Ok(response);
        }
    }
}

