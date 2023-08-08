<script lang="ts">
    import {flex} from "../css/root.styles.ts";
    import ButtonWithModal from "../components/shared/ButtonWithModal.svelte";
    import CreateTaskForm from "../components/forms/CreateTaskForm.svelte";
    import {Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell} from "flowbite-svelte";
    import {onMount} from "svelte";
    import {client} from "$lib/client.ts";

    let items: Task[] = [];

    onMount(() => {
        client.paginate('tasks').then(data => items = data);
    });
</script>

<div class="dark">
    <div class={flex('row', 'inherit', 'end')}>
        <ButtonWithModal on:submitted={console.log} text="Create task" modalTitle="Create a task">
            <CreateTaskForm />
        </ButtonWithModal>
    </div>

    <div class="mt-10">
        <Table>
            <TableHead>
                <TableHeadCell>Name</TableHeadCell>
                <TableHeadCell>Description</TableHeadCell>
                <TableHeadCell>Text</TableHeadCell>
                <TableHeadCell>Edit</TableHeadCell>
                <TableHeadCell>Delete</TableHeadCell>
            </TableHead>
            <TableBody class="divide-y">
                {#each items as element}
                    <TableBodyRow>
                        <TableBodyCell>{element.name}</TableBodyCell>
                        <TableBodyCell>{element.description}</TableBodyCell>
                        <TableBodyCell>{element.text}</TableBodyCell>
                        <TableBodyCell><Button color="yellow">Edit</Button></TableBodyCell>
                        <TableBodyCell><Button color="red">Remove</Button></TableBodyCell>
                    </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
    </div>
</div>
