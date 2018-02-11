/**
 * Handles activity log dom elements
 */
class ActivityLogFactory
{
    /**
     * Create an activity log dom element
     *
     * @param string userName
     * @param string createdAt
     * @param string description
     * @returns {HTMLElement}
     */
    static createAndAppend(userName, createdAt, description) {
        console.log();
        let activityLog = this.createContainer(userName, createdAt, description, false);
        // Append the new activity to the logs
        $('div#activityLogs').append(activityLog);
    }

    /**
     * Create an activity log dom element
     *
     * @param string userName
     * @param string createdAt
     * @param string description
     * @returns {HTMLElement}
     */
    static createAndPrepend(userName, createdAt, description) {
        let activityLog = this.createContainer(userName, createdAt, description);
        // If we don't have any activity logs clear out the div
        if ($('div#noActivities').length) {
            $('div#noActivities').slideUp(500, function() {
                $('div#noActivities').remove();
            });
        }
        // Prepend the new activity to the logs
        $('div#activityLogs').prepend(activityLog);
        activityLog.slideDown(500);
    }

    /**
     * Create an activity log container element
     *
     * @param string userName
     * @param string createdAt
     * @param string description
     * @param bool hide
     * @returns {HTMLElement}
     */
    static createContainer(userName, createdAt, description, hide = true)
    {
        let element = $("<div>", {
            'class': 'list-group-item',
        });
        if (hide) {
           element.css('display', 'none');
        }
        return element.append(this.createHeading(userName, createdAt))
            .append(this.createDescription(description));
    }

    /**
     * Create an activity log heading element
     *
     * @param string userName
     * @param string createdAt
     * @returns {HTMLElement}
     */
    static createHeading(userName, createdAt)
    {
        return $('<h4>', {
            'class': 'list-group-item-heading',
            'html': userName
        }).append(this.createDate(createdAt));
    }

    /**
     * Create an activity log date element
     *
     * @param string createdAt
     * @returns {HTMLElement}
     */
    static createDate(createdAt)
    {
        return $('<span>', {
            'class': 'list-group-item-date',
            'html': createdAt
        });
    }

    /**
     * Create an activity log description element
     *
     * @param string description
     * @returns {HTMLElement}
     */
    static createDescription(description)
    {
        return $('<p/>', {
            'class': 'list-group-item-text',
            'html': description
        });
    }
}
module.exports = ActivityLogFactory;