<script setup>


</script>

<template>
    <header>
        <div class="navbar bg-base-100">
            <div class="flex-1">
                <a href="/" class="btn btn-ghost text-xl">C Parsons Puzzles</a>
            </div>
            <div class="navbar-center">
                {{ $route.name }}
            </div>
            <div class="navbar-end">
                <ul class="menu menu-horizontal px-1">
                    <li>
                        <RouterLink to="/parsons">Parsons</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/sobre">Sobre</RouterLink>
                    </li>
                    <li class="dropdown dropdown-end">
                        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                            <div class="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="" />
                            </div>
                        </div>
                        <ul tabindex="0"
                            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <RouterLink to="login">Login</RouterLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>
