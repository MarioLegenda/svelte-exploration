<script lang="ts">
    import {createTaskFormInput, flex} from "../../css/root.styles.ts";
    import {client} from "$lib/client.ts";

    import {Button, Input, Label, Textarea} from "flowbite-svelte";
    import {onSuccess} from "../shared/store.ts";
    import {createForm} from "../../lib/validation/createForm";
    import {prepareSubmit} from "../../lib/validation/prepareSubmit";

    const form = createForm({
        initialValues: {
            name: {
                value: '',
                validation: {
                    required: (value) => {
                        if (!value) {
                            return 'Name is required';
                        }
                    },
                }
            },
            description: {
                value: '',
                validation: {
                    required: true,
                }
            },
            text: {
                value: '',
                validation: {
                    required: true,
                }
            }
        }
    });
    const onSubmit = async (values) => {
        await client.query('tasks', values);

        onSuccess.update(() => true);
    };


</script>

<form on:submit|preventDefault={prepareSubmit(onSubmit)}>
    <div class={createTaskFormInput}>
        <Label color={$form.name.errors ? 'red' : 'current'} for='name' class='block mb-2'>Task name</Label>
        <Input class={$form.name.errors?.required ? 'border-red-500' : 'border-black'} on:input={$form.name.onChange} name="name" placeholder="Task name" label="Name" />
    </div>

    <div class={createTaskFormInput}>
        <Label color={$form.name.errors ? 'red' : 'current'} for='description' class='block mb-2'>Task description</Label>
        <Textarea class={$form.description.errors?.required ? 'border-red-500' : 'border-black'} on:input={$form.description.onChange} name='description' placeholder="Task description" />
    </div>

    <div class={createTaskFormInput}>
        <Label color={$form.name.errors ? 'red' : 'current'} for='Task text'  class='block mb-2'>Task text</Label>
        <Textarea class={$form.name.errors?.required ? 'border-red-500' : 'border-black'} name="text" placeholder="Task text" />
    </div>

    <div class={flex('row', 'inherit', 'flex-end')}>
        <Button disabled={$form.isSubmitting} type="submit">Create</Button>
    </div>
</form>