<?php

namespace App\Events;

use App\Contracts\ActivityLogEventContract;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Broadcasting\Channel;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;

class UsersAttachedToRole implements ActivityLogEventContract
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private $user;
    private $attachedUsers;
    private $role;
    private $description;

    /**
     * Create a new event instance.
     *
     * @param \App\Models\User $authUser
     * @param \Illuminate\Database\Eloquent\Collection $attachedUsers
     * @param \App\Models\Role $role
     * @return void
     */
    public function __construct(User $user, Collection $attachedUsers, Role $role)
    {
        $this->user = $user;
        $this->attachedUsers = $attachedUsers;
        $this->role = $role;
        $this->description = "User(s) '"
            . $this->attachedUsers->implode('name', ', ')
            . "' attached to role '"
            . $this->role->display_name . "'.";
    }

    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'ActivityLogCreated';
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('ActivityLog');
    }

    /**
     * Define what properties should be broadcast to the client
     *
     * @return array
     */
    public function broadcastWith(): array
    {
        return [
            'user_name' => $this->user->name,
            'description' => $this->description,
            'created_at_diff_for_humans' => Carbon::now()->diffForHumans(),
        ];
    }

    /**
     * Return the description for this event
     *
     * @return string
     */
    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * Return the auth user for this event
     *
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
    }
}
