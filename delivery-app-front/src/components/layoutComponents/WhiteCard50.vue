<template>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-10 col-lg-10 col-xl-8">
        <div class="card bg-white text-dark" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">
            <div class="mt-md-4 pb-5">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>