<script lang="ts">
    // @ts-nocheck
    import Calendar from '@event-calendar/core';
    import ResourceTimeGrid from '@event-calendar/resource-time-grid';

    let plugins = [ResourceTimeGrid];
    let options = {
        allDaySlot: false,
        slotDuration: '00:15',
        scrollTime: '07:00:00',
        height:'800px',
        events: [
        ]
    };
</script>

<Calendar {plugins} {options} />